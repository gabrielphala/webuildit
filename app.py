from flask import Flask, render_template , request
from flask_cors import CORS

from functools import cache

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

import json

class Cashbuild:
	def __init__ (self):
		self.url = 'https://cashbuild.co.za/shop/'
		self.products = []

	def search (self, browser, text):
		browser.get(self.url)

		buttons = browser.find_element("xpath", '/html/body/main/footer/div[2]/div/div[2]/div/div/div/div/button');

		if (buttons): buttons.click()

		inputBox = browser.find_element("id", "leo_search_query_top")

		inputBox.send_keys(text)

		btn = browser.find_element("id", "leo_search_top_button")

		btn.click()

		items = browser.find_elements("xpath", '/html/body/main/section/div[2]/div/div/section/div[3]/div/div[1]/div/div/div')

		for index, item in enumerate(items):
			image = (browser.find_element("xpath", "/html/body/main/section/div[2]/div/div/section/div[3]/div/div[1]/div/div/div[" + str(index + 1) + "]/article/div/div[1]/a/img")).get_attribute("src")
			link = browser.find_element("xpath", '/html/body/main/section/div[2]/div/div/section/div[3]/div/div[1]/div/div/div[' + str(index + 1) + ']/article/div/div[2]/h3/a')
			addr = link.get_attribute("href")
			title = link.text

			price = (browser.find_element("xpath", '/html/body/main/section/div[2]/div/div/section/div[3]/div/div[1]/div/div/div[' + str(index + 1) + ']/article/div/div[2]/div[1]/span/span[2]')).get_attribute('content')

			self.products.append({
				"image": image,
				"addr": addr,
				"title": title,
				"price": price
			})

		browser.quit();
def Factory (type):
	if type == 'cashbuild': return Cashbuild()

options = Options()
options.add_experimental_option("detach", True)

app = Flask(__name__)

CORS(app)

def set_up_browser(options):
	return webdriver.Chrome(options=options)

@app.route('/search', methods=['POST'])
def search ():
	products = []
	kinds = ['cashbuild']

	browser = set_up_browser(options)

	for item in kinds:
		service = Factory(item)

		service.search(browser, request.json['text'])

		products.extend(service.products)

	return json.dumps(products)