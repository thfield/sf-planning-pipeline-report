import csv
import json
import os
from itertools import izip

################################################################################
# Allows for a mapping file to be used to convert field names from the file
# format to the desired value
#
def load_csv_with_mapping(csvfile, column_mapping):
    mapped_data = []
    for row in csv.DictReader(csvfile):
        mapped_row = dict((column_mapping[k], v) for k, v in row.iteritems())
        mapped_data.append(mapped_row)
    return mapped_data

################################################################################
# Given a file with the column names, create a list of dictionaries with
# additional entries for the year and quarter created from the date field to
# ease future transforms
#
# see https://docs.google.com/spreadsheets/d/1ikjaHDLf-iCGBCQ1KmSIXVEiVNbX8pQzW26yYqhrH3U/edit#gid=1633784412
#
column_mappings = []
for mapping_filename in os.listdir('data/raw/columnnames/'):
    with open('data/raw/columnnames/' + mapping_filename, 'rb') as mapping_file:
        column_mapping = {}
        column_mapping['year'] = mapping_filename[0:4]
        column_mapping['quarter'] = mapping_filename[5:6]
        for row in csv.DictReader(mapping_file):
            column_mapping[row['key']] = row['value']
        column_mappings.append(column_mapping)

################################################################################
# Load each file based on filename conventions and apply the column cleaning
#
for column_mapping in column_mappings:
    filename = 'San_Francisco_Development_Pipeline_%s_Quarter_%s' % (
        column_mapping['year'],
        column_mapping['quarter'],
    )

    housing_data_csv_filename = 'data/raw/' + filename + '.csv'
    print('loading ' + housing_data_csv_filename)
    with open(housing_data_csv_filename, 'rb') as csvfile:
        housing_data = load_csv_with_mapping(csvfile, column_mapping)

        housing_data_json_filename = 'data/cleaned/' + filename + '.json'
        print('writing ' + housing_data_json_filename)
        with open(housing_data_json_filename, 'w') as jsonfile:
            json.dump(housing_data, jsonfile, indent=2)
