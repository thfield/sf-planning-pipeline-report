#!/bin/bash

ogr2ogr -nlt POLYGON -skipfailures "$2".shp "$1" OGRGeoJSON
