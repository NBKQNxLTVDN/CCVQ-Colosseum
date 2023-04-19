# TODO - edit this ip to 192.168.0.100 to run connect socket to server, (localhost by default)
# serverIp='192.168.38.84'
serverIp='169.254.133.159'

eval 'cd client/ && REACT_APP_SERVER_URL=$serverIp npm start'
