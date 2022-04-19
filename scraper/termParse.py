#! python3
# -*- coding: utf-8 -*-

"""
Extract a list of the terms and term codes that populates
the dropdown 
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.chrome.options import Options

from helpers import writeList


def getTerms(driver_path, url):
    """retrieve terms + term codes from menu in course catalog

    Args:
        driver_path (str): path to chrome driver
        url (str): url to course catalog

    Returns:
        terms (list): list of term codes extracted from the dropdown menu
    """

    terms = []
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(driver_path, options=chrome_options)
    driver.get(url)
    iframe = driver.find_element_by_id("ptifrmtgtframe")
    driver.switch_to.frame(iframe)

    count = len(
        WebDriverWait(driver, 20).until(
            EC.visibility_of_all_elements_located(
                (By.XPATH, "//select[@id='SSR_CLSRCH_WRK_SUBJECT_SRCH$1']/option")
            )
        )
    )
