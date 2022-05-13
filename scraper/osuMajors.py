#! python3
# -*- coding: utf-8 -*-

"""
Scrape course information from the Ohio State Course Catalog
and export to CSV file
"""

from cgitb import text
from lib2to3.pgen2 import driver
from time import sleep 
import requests
import warnings
import json
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
    
    names_list = []
    description_list=[]
    degrees_list = []
    colleges_list = []
    

    names = driver.find_elements(By.CSS_SELECTOR, "p.title")
    for name in names:
        names_list.append(name.text)
    
    descriptions = driver.find_elements(By.CSS_SELECTOR, "p.preview")
    for desc in descriptions:
        description_list.append(desc.text)

    degrees = driver.find_elements(By.CSS_SELECTOR, "p.degree")
    for degree in degrees:
        degrees_list.append(degree.text)

    colleges = driver.find_elements(By.CSS_SELECTOR, "p.school")
    for college in colleges:
        colleges_list.append(college.text)


    df = pd.DataFrame()
    df['major_name'] = names_list
    df['description'] = description_list

    df.to_json('data/majors.json', orient='records')

getMajors(driver_path="/Users/julia/Projects/buckiplan/scraper/chromedriver", url='http://undergrad.osu.edu/majors-and-academics/majors')

