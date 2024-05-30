@echo on
call ssh -p 443 -o ServerAliveInterval=30 -R0:localhost:5000 a.pinggy.io