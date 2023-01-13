# echo '{"level":"warning","msg":"lastPublishedAt from channel is zero"}' | ./build/bin/lsklog.js
# ssh worker "echo '{"level":"warning","msg":"lastPublishedAt from channel is zero"}'" | ./build/bin/lsklog.js
# cat ./tests/pipe.txt | ./build/bin/lsklog.js

ssh worker "echo '{\"level\":\"warning\",\"msg\":\"lastPublishedAt from channel is zero 123\"}'" | /Users/isuvorov/projects/lskjs/packages/log2/build/bin/bunyan.js

ssh worker "sudo docker service logs prod_kernel_tiktok_channel_info_fix --tail 3 --raw" | /Users/isuvorov/projects/lskjs/packages/log2/build/bin/bunyan.js