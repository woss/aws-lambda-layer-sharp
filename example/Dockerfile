FROM amazonlinux as baseBox
WORKDIR /app

RUN yum -y install make gcc*
RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash -
RUN yum -y install nodejs


####################
## DEPLOYMENT BOX ##
####################
FROM baseBox as deployBox
COPY . .
RUN yarn

RUN ["chmod", "+x", "deploy.sh"]
CMD ./deploy.sh ; sleep 2m