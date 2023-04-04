#!/bin/bash
cd rifaem2webapp
source myvenv/bin/activate
pip install -r requirements.txt
python3.8 -m flask run
