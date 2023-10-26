#!/bin/sh
# Permission denied : chmod +x ./deploy/build-env.sh
# ./deploy/build-env.sh -e .env.dev

ENVFILE_OPT=""
DEFAULT_ENV=".env"
ENV_FILENAME="./$DEFAULT_ENV"

NEW_VERSION=""
PACKAGE_JSON_PATH="package.json"

func_ask_env_mode()
{
  echo "start func_ask_env_mode"
  read -p "mode: " mode
  if [ "$mode" != "default" ] && [ "$mode" != "" ]
    then
      ENV_FILENAME="$ENV_FILENAME.$mode"
  fi
}

func_set_final_env_filename()
{
  if [ -e "$ENV_FILENAME" ]
    then 
      echo "> $ENV_FILENAME file exists."
  else 
      echo "> $ENV_FILENAME does not exist."
      ENV_FILENAME="$DEFAULT_ENV"
  fi  
}

func_create_default_env_file_if_not_exist()
{
  if [ -e "$DEFAULT_ENV" ]
    then
      echo "$DEFAULT_ENV file exists."
  else
      echo "$DEFAULT_ENV file does not exist."
      touch $DEFAULT_ENV
  fi
}

func_set_script_opt()
{
    while getopts e:v: opt
    do
        case $opt in
            e) ENVFILE_OPT=$OPTARG ;;
            v) NEW_VERSION=$OPTARG ;;
            *) echo "$opt is not the option";;
        esac
    done
}


func_backup_current_env_file()
{
  # nest build는 .env만 적용이 되므로, .env 내용을 _backup으로 복사해둔다.
  if [ "$ENV_FILENAME" != "$DEFAULT_ENV" ]
  then
    mv $DEFAULT_ENV .env_backup
    cp $ENV_FILENAME .env 
  fi

}


# script start ------------------------
func_create_default_env_file_if_not_exist
func_set_script_opt $@

if [ "$ENVFILE_OPT" != "" ]
  then
    ENV_FILENAME="$ENVFILE_OPT"
else 
  func_ask_env_mode
fi

func_set_final_env_filename
echo "> final env filename: $ENV_FILENAME \n"

rm -rf dist
func_backup_current_env_file
npx env-cmd -f $ENV_FILENAME npm run build