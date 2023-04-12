#!/bin/bash
cd rifaem2webapp
source env/bin/activate
pip install -r requirements.txt
python -m flask run
