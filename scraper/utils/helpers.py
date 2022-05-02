#! python3
# -*- coding: utf-8 -*-

""" Helper functions """

def checkPages(res):
    """check the total number of pages in the api 
    
    Args:
        res [object]: content of http request
    
    Returns:
        totalPages [int]: total number of pages as int
    
    """
    totalPages = res["data"]["totalPages"]
    return totalPages

def readFile(txt_file, list_name):
    """read a text file and save the contents as a list

    Args:
        txt_file [str]: name of text file to read
        list_name [str]: name of list to read text file contents to
    
    Returns:
        list_name [str]: list containing the content of the text file
    
     """
    list_name = []
    with open(txt_file, "r") as filehandle:
        filecontents = filehandle.readlines()
        for line in filecontents:
            current_subject = line[:-1]
            list_name.append(current_subject)
    
    return list_name

def writeList(items: list, file_name: str):
    """write the contents of a list to a text file

    Args: 
        items [list]: list of items to be saved
        file_name [str]: name of file to write list to
    """
    with open(file_name, "w") as f:
        for item in items:
            f.write("%s\n" % item)

