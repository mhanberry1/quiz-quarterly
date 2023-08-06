from nginx:alpine

run apk add --no-cache certbot-nginx

entrypoint if [ $CREATE_CERT ]; then \
	nginx && \
	certbot \
	--non-interactive \
	--agree-tos \
	-m $EMAIL \
	--domains $DOMAINS \
	--nginx; \
	tail -f /dev/null; \
else \
	nginx -g 'daemon off;'; \
fi
