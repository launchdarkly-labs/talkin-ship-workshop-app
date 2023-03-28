FROM postgres:14

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres_password
ENV POSTGRES_DB dc_comics

ADD database.sql /docker-entrypoint-initdb.d/