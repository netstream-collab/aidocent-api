# ./deploy/test.sh
# Permission denied : chmod +x ./deploy/test.sh

REMOTE_SERVER_IP="none"
REMOTE_USERNAME="devcat"

func_set_script_opt()
{
    while getopts u:i: opt
    do
        case $opt in
            i) REMOTE_SERVER_IP=$OPTARG ;;
            u) REMOTE_USERNAME=$OPTARG  ;;
            *) echo "$opt is not the option";;
        esac
    done
}

# script start ------------------------
func_set_script_opt $@
echo "ip: $REMOTE_SERVER_IP"
echo "user: $REMOTE_USERNAME"

# SSH 연결 테스트
ssh_user="ec2-user"
ssh_host="3.35.26.10"
ssh_pem="/Users/netstream/Documents/00__Server_Key/key-gallery2-dev.pem"

if ssh_check; then
    echo "SSH 연결 성공!"
    # 여기에 다음으로 실행할 로직을 추가하세요.
else
    echo "SSH 연결 실패!"
    exit 1
fi