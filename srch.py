import requests

URL = input("enter url u which to scrap:")
#URL = "https://realpython.github.io/fake-jobs/"
page = requests.get(URL)
with open('srch.txt', 'a') as f:
 f.write(page.text)
 f.close()
#print(page.text)
