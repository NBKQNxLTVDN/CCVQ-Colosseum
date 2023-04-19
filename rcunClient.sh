# TODO - edit this ip to 192.168.0.100 to run connect socket to server, (localhost by default)
# serverIp='192.168.38.84'
serverIp='172.31.26.61'

eval 'cd client/ && REACT_APP_SERVER_URL=http://$serverIp REACT_APP_ADMIN_ENDPOINT=http://$serverIp:2021/admin npm start'
``