# Python Libraries
from pandas.core.indexes.base import Index
import requests
import sys
import json
from urllib import request, parse
from urllib.error import URLError, HTTPError
from datetime import datetime, time, timedelta
import uuid
import pandas as pd
import random
import string

# FastAPI Packages
from typing import Optional
from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import xlrd

# # Adding path to import other files
# sys.path.append('./')

# Import Cursor
# from sqlConn import cursor

app = FastAPI(debug=True)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class hospital_Filter_data(BaseModel):
    state : str
    city : str

def read_Data(sheet, usecols):
    res = []

    for i in range(1,sheet.nrows):
        # print(sheet.nrows)

        obj1 = {}
        for j in range(sheet.ncols):
            # print(sheet.cell_value(0,j))
            # print(sheet.cell_value(i, j))
            obj1[sheet.cell_value(0,j)]=sheet.cell_value(i, j)

        res.append(obj1)
    
    return res

@app.post("/getHospitalsData/")
async def read_Hospital_Data(inputData : hospital_Filter_data):
    try : 
        wb = xlrd.open_workbook(r"..\WIT_INPUTSHEET.xlsx")
    except:
        return False
        
    sheet = wb.sheet_by_index(0)

    usecols=['ID','Facility Name','Address','Pin Code','City','State','Contact Information','Vacant Beds for COVID Patients','Vacant ICU Beds','Available Ventilators','Oxygen Availability','Last Update','Remdesivir','Favipiravir (also known as Avigan)',
            'Molnupiravir','Recombinant ACE-2','Deriphyllin R 300mg','Nebulise 1mg','Duolin', 'Medrol',' Colchicine','Ivepred','Inh foracort forte  ( Inhaler )','Cap Rosuva-gold 10']

    res = read_Data(sheet,usecols)
    
    return JSONResponse(content = res)


def readFilteredData(sheet, usecols, hospital_data):
    res = []

    for i in range(1,sheet.nrows):
        # print(sheet.nrows)

        flag = True

        obj1 = {}
        for j in range(sheet.ncols):
            # print(sheet.cell_value(0,j))
            # print(sheet.cell_value(i, j))
            if(sheet.cell_value(0,j)=="State"):
                if(sheet.cell_value(i, j)!=hospital_data['state']):
                    flag = False

            elif(sheet.cell_value(0,j)=="City"):
                 if(sheet.cell_value(i, j)!=hospital_data['city']):
                    flag = False

            # elif(sheet.cell_value(0,j)=="Pin Code"):
            #     print(int(sheet.cell_value(i, j)))
            #     print(hospital_data['pincode'])
            #     if(int(sheet.cell_value(i, j))!=hospital_data['pincode']):
            #         flag = False

            obj1[sheet.cell_value(0,j)]=sheet.cell_value(i, j)
        
        print(flag)

        if(flag):
            res.append(obj1)
    
    return res

@app.post("/getHospitalsData/filter/")
async def read_Hospital_Data_By_Filter(inputData : hospital_Filter_data):

    try : 
        wb = xlrd.open_workbook(r"..\WIT_INPUTSHEET.xlsx")
    except:
        return False
        
    sheet = wb.sheet_by_index(0)

    usecols=['ID','Facility Name','Address','Pin Code','City','State','Contact Information','Vacant Beds for COVID Patients','Vacant ICU Beds','Available Ventilators','Oxygen Availability','Last Update','Remdesivir','Favipiravir (also known as Avigan)',
            'Molnupiravir','Recombinant ACE-2','Deriphyllin R 300mg','Nebulise 1mg','Duolin', 'Medrol',' Colchicine','Ivepred','Inh foracort forte  ( Inhaler )','Cap Rosuva-gold 10']
    
    inputData = inputData.dict()
    # print(inputData['pincode'])

    res = readFilteredData(sheet,usecols, inputData)
    
    return JSONResponse(content = res)

@app.get("/getHospitalsData/{hospital_id}")
async def read_Hospital_Data_By_ID(hospital_id : str):
    try : 
        wb = xlrd.open_workbook(r"..\WIT_INPUTSHEET.xlsx")
    except:
        return False
        
    sheet = wb.sheet_by_index(0)

    usecols=['ID','Facility Name','Address','Pin Code','City','State','Contact Information','Vacant Beds for COVID Patients','Vacant ICU Beds','Available Ventilators','Oxygen Availability','Last Update','Remdesivir','Favipiravir (also known as Avigan)',
            'Molnupiravir','Recombinant ACE-2','Deriphyllin R 300mg','Nebulise 1mg','Duolin', 'Medrol',' Colchicine','Ivepred','Inh foracort forte  ( Inhaler )','Cap Rosuva-gold 10']

    res = read_Data(sheet,usecols)

    for obj in res:
        if(obj["ID"]==hospital_id):
            return obj
    
    return {}

class HospitalData(BaseModel):
    FacilityName: str
    Address: str
    Pincode: int
    City: str
    State: str
    ContactInfo: str
    VacantBeds: int
    VacantICUBeds: int
    Ventilators: int
    Oxygen: int
    lastUpdated: str
    Remdesivir: str
    Favipiravir: str
    Molnupiravir: str
    Recombinant: str
    Deriphyllin: str
    Nebulise: str
    Duolin: str
    Medrol: str
    Colchicine: str
    Ivepred: str
    Inh_foracort_forte: str
    Cap_Rosuva_gold: str

@app.post("/addHospitalData/")
async def addHospitalData(curr_data : HospitalData):

    curr_data = curr_data.dict()
    
    data = {
        "ID" : uuid.uuid4().hex[:8] ,
        "Facility Name": curr_data["FacilityName"],
        "Address": curr_data["Address"],
        "Pin Code": curr_data["Pincode"],
        "City": curr_data["City"],
        "State": curr_data["State"],
        "Contact Information": curr_data["ContactInfo"],
        "Vacant Beds for COVID Patients": curr_data["VacantBeds"],
        "Vacant ICU Beds": curr_data["VacantICUBeds"],
        "Available Ventilators": curr_data["Ventilators"],
        "Oxygen Availability": curr_data["Oxygen"],
        "Last Update": curr_data["lastUpdated"],
        "Remdesivir": curr_data["Remdesivir"],
        "Favipiravir (also known as Avigan)": curr_data["Favipiravir"],
        "Molnupiravir": curr_data["Molnupiravir"],
        "Recombinant ACE-2": curr_data["Recombinant"],
        "Deriphyllin R 300mg": curr_data["Deriphyllin"],
        "Nebulise 1mg": curr_data["Nebulise"],
        "Duolin": curr_data["Duolin"],
        "Medrol": curr_data["Medrol"],
        "Colchicine": curr_data["Colchicine"],
        "Ivepred": curr_data["Ivepred"],
        "Inh foracort forte  ( Inhaler )": curr_data["Inh_foracort_forte"],
        "Cap Rosuva-gold 10": curr_data["Cap_Rosuva_gold"]
    }

    excel_data_frame = pd.read_excel(r"..\WIT_INPUTSHEET.xlsx",index_col = False)
    
    excel_data_frame = excel_data_frame.append(data,ignore_index=True)

    excel_data_frame.to_excel(r"..\WIT_INPUTSHEET.xlsx",index=False)

    return {}

@app.get('/getChartData')
async def createChartData():
    try : 
        wb = xlrd.open_workbook(r"..\WIT_INPUTSHEET.xlsx")
    except:
        return False
        
    sheet = wb.sheet_by_index(0)

    usecols=['Facility Name','State']

    res = read_Data(sheet,usecols)

    states = []
    for obj in res:
        if(obj['State'] not in states):
            states.append(obj['State'])
    
    new_obj = {}
    for state in states:
        new_obj[state] = []

    for obj in res:
        if(obj['Facility Name'] not in new_obj[obj['State']]):
            new_obj[obj['State']].append(obj['Facility Name'])
    
    count_of_hospitals = []
    for state in states:
        number = len(new_obj[state])
        count_of_hospitals.append(number)

    print(states)
    print(count_of_hospitals)

    res_obj = {
        "states_data" : states,
        "number_of_hospitals" : count_of_hospitals
    }
    
    return JSONResponse(content = res_obj)

@app.get('/getStatesAndCities')
async def getStatesAndCitiesData():
    try : 
        wb = xlrd.open_workbook(r"..\WIT_INPUTSHEET.xlsx")
    except:
        return False
        
    sheet = wb.sheet_by_index(0)

    usecols=['Facility Name','State']

    res = read_Data(sheet,usecols)

    states = []
    for obj in res:
        if(obj['State'] not in states):
            states.append(obj['State'])
    
    new_res = []
    for state in states:
        temp = {
            "state" : state,
            "cities" : []
        }
        new_res.append(temp)
    
    for state in states:
        cities = []
        for obj in res:
            if(obj['State']==state):
                if(obj['City'] not in cities):
                    cities.append(obj['City'])
        
        for obj in new_res:
            if(obj['state']==state):
                for city in cities:
                    temp = {
                        "city" : city
                    }
                    obj['cities'].append(temp)

    # print(new_res)
    
    return JSONResponse(content = new_res)
