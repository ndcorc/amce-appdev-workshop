#!/bin/sh

# Define PYTHONPATH as local modules folder
#export PYTHONPATH=${APP_HOME}/modules

# Extract LIBAOI libs from Debian package (into ./lib/x86_64-linux-gnu)
#dpkg-deb -R libaio1_0.3.110-1_amd64.deb ${APP_HOME}

# Finalize OCI installation by creating required softlink
#ln -s -f ${APP_HOME}/lib/instantclient_12_2/libclntsh.so.12.1 ${APP_HOME}/lib/instantclient_12_2/libclntsh.so

# Add OCI and LIBAIO to shared library path
#export LD_LIBRARY_PATH=${APP_HOME}/lib/instantclient_12_2:${APP_HOME}/lib/x86_64-linux-gnu

# Install Python packages into local modules folder
#export PYTHONPATH=modules
#python server.py
#export PYTHONPATH=${APP_HOME}/modules
#virtualenv venv
#source venv/bin/activate
#pip install -r requirements.txt -t modules
#export PYTHONPATH=${APP_HOME}/modules
#su -c "echo $UID"
#su root -c "echo $UID"
#su -c "pip install -r requirements.txt"
#su -c "pip install flask"
#su -c "python server.py"

pip install -r requirements.txt -t ${APP_HOME}/modules
export PYTHONPATH=${APP_HOME}/modules
python ${APP_HOME}/server.py