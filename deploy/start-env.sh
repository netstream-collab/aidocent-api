#!/bin/sh
# Permission denied : chmod +x ./deploy/start-env.sh
# ./deploy/start-env.sh -e .env.dev
ENVFILE_OPT=""
DEFAULT_ENV=".env"
ENV_FILENAME="$DEFAULT_ENV"

func_ask_env_mode()
{
  echo "choose to use env"
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
      # echo ""
      echo "$ENV_FILENAME file exists."
  else 
      echo "$ENV_FILENAME does not exist."
      ENV_FILENAME="$DEFAULT_ENV"
  fi  
}

func_set_script_opt()
{
  set -- $(getopt e: "$@")
  while [ -n "$1" ]
  do
    case "$1" in
      -e) param=$2
          ENVFILE_OPT=$param
          shift;;
      --) shift
            break;;
      *) echo "$1 is not an option";;
    esac
    shift
  done
}


# script start ------------------------
func_set_script_opt $@

if [ "$ENVFILE_OPT" != "" ]
  then
    ENV_FILENAME="$ENVFILE_OPT"
else 
  func_ask_env_mode
fi

func_set_final_env_filename

echo "final env filename: $ENV_FILENAME"
npx env-cmd -f $ENV_FILENAME nest start --watch