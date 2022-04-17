import os, json
import logging

from os import path
from config import OUTPUT_DIR

def json_datetime_dump(obj):
    if hasattr(obj, 'isoformat'):
        return obj.isoformat()
    else: 
        raise TypeError('Object of type %s with value of %s is not JSON serializable' % (type(obj), repr(obj)))

def out_path(dirname):
    if not OUTPUT_DIR:
        return False
    
    out = os.path.join(OUTPUT_DIR, dirname)
    
    try:
        os.makedirs(out)
    except:
        pass
    
    return out

def write_course(course):
    merged_course = course['basic'].copy()
    merged_course.update(course['extra'])

    filename = '{subject}_{number}.json'.format(**merged_course)

    write_json_file(course, filename, 'courses')

def write_subject(subject):
    filename = '{abbreviation}.json'.format(**subject)
    write_json_file(subject, filename, 'subjects')

def write_section(section):
    merged_section = section['basic']
    filename = '{year}_{season}_{subject}_{course}_({solus_id}).json'.format(**merged_section)
    write_json_file(section, filename, 'sections')


def write_json_file(obj, filename, output_dir):
    """ dumps an objects and json pretty prints to file"""

    out = out_path(output_dir)
    with open(os.path.join(out, filename), 'w') as f:
        f.write(json.dumps(obj, indent=4, default=json_datetime_dump, sort_keys=True))