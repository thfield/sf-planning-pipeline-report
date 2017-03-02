import pandas
import logging

from osgeo import ogr

logging.basicConfig()

def load_polygons():
    polyshp = driver.Open('neighborhoods.shp')
    ppolygon_layer = polyshp.GetLayer(0)

    neighborhood_features = []

    for feature in polygon_layer:
        neighborhood_features.append(feature)
    return neighborhood_features



def get_point(x, y):
    point = ogr.Geometry(ogr.wkbPoint)
    point.AddPoint(x, y)
    return point


def classify_point(point, polygons):
    for polygon in polygons:
        if polygon.GetGeometryRef().Contains(point):
            return polygon.GetField('nhood')
    logger.info("No polygon found for {}".format(str(point)))
    return "Unknown"


def classify_df(df):
    polygons = load_polygons()
    coord = zip(df.x.tolist(), df.y.tolist())
    df.classified_neighborhood = pandas.Series([classify_point(get_point(*coord), polygons) for coord in coords])
