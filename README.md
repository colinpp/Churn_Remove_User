# nest-lambda-docker-container-surpport

This project is aws service to delete churned numbers.

---

## following steps

Before we start, we need docker and aws cli.
If it's not installed, please refer to the link below.

#### Ensure Docker CLI is installed: https://docs.docker.com/get-docker/

#### Ensure AWS CLI is installed: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

Instructions to get started on local machine 
If the installation is complete, let's get started.

- `npm install serverless -g`
- insert command
  ```
  serverless config credentials \
    --provider aws \
    --key <INSERT YOUR ACCESS KEY> \
    --secret <INSERT YOUR SECRET KEY> \
    --profile lambda-docker
  ```
- pull "lambda nodejs:14" docker image
  ```
  docker pull public.ecr.aws/lambda/nodejs:14
  ```
- Come back to the nest-lambda-docker-container-surport project then add modules
  ```
  yarn add
  ```
- This is all!! Now Let's deploy!!
  ```
  sls deploy
  ```
- Wait a minute then you will Success deploy
 
