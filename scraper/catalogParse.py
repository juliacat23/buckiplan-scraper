#! python3
# -*- coding: utf-8 -*-

"""
Extract information that populates the dropdown buttons
in the OSU catalog
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.chrome.options import Options


def getSubjects(driver_path, url):
    """retrieve subjects from menu in course catalog

    Args:
        driver_path (str): path to chrome driver
        url (str): url to course catalog

    Returns:
        subjects (list): list of subjects extracted from the dropdown menu
    """

    subjects = []
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

    dropdown = Select(
        driver.find_element_by_xpath("//*[@id='SSR_CLSRCH_WRK_SUBJECT_SRCH$1']")
    )
    for i in dropdown.options:
        subjects.append(i.get_attribute("value"))
    driver.close()
    subjects.pop(0)

    return subjects


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
                (By.XPATH, "//select[@id='CLASS_SRCH_WRK2_STRM$35$']/option")
            )
        )
    )
    dropdown = Select(
        driver.find_element_by_xpath("//*[@id='CLASS_SRCH_WRK2_STRM$35$']")
    )
    for i in dropdown.options:
        terms.append(i.get_attribute("value"))
    driver.close()
    terms.pop(0)

    return terms
