#! python3
# -*- coding: utf-8 -*-

"""
Scrape course information from the Ohio State Course Catalog
and export to CSV file
"""

from lib2to3.pgen2 import driver
from time import sleep 
import requests
import warnings
import pandas as pd
import numpy as np

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains


from colorama import init, Fore


# Cross-platform colored terminal text
init(autoreset=True)

def getMajors(driver_path, url): 
    majors = []
    chrome_options = Options()
    chrome_options.add_argument("--auto-open-devtools-for-tabs")

    driver = webdriver.Chrome(driver_path, options=chrome_options)
    driver.get(url)
    driver.maximize_window()
    sleep(20)
    # currentElement = driver.switch_to_active_element()
    # print(currentElement)    
    # action = ActionChains(driver)
    # print("Success!")
    # driver.find_element(By.XPATH, "//*[@id='dismiss-message']").click()
    # print("alert dismissed")
    # filterExpand = driver.find_element_by_xpath("//*[@id='ui-collapse-118']")
    # action.move_to_element(filterExpand).perform()
    
    text = []
    # major_text = []
    

    ids = driver.find_elements(By.CSS_SELECTOR, "p.title")
    for id_text in ids:
        text.append(id_text.text)
    
    df = pd.DataFrame()
    text_len = len(text) + 1
    id = pd.Series(range(1,text_len))
    df['id'] = id
    df['text'] = text

    df.to_json('data/majors.json', orient='records')

    print(df)


getMajors(driver_path="/Users/julia/Projects/buckiplan/scraper/chromedriver", url='http://undergrad.osu.edu/majors-and-academics/majors')

