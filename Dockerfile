FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:14

COPY . .

RUN npm run build

CMD ["dist/lambda.handler"]
