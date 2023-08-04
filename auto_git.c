#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
	time_t Time = time(NULL);
	struct tm* t = localtime(&Time);
	char commit[100];
	system("git add *");
	snprintf(commit, sizeof(commit), "git commit -m '%02d/%02d(%02d:%02d)'", t->tm_mon+1, t->tm_mday, t->tm_hour, t->tm_min);
	system(commit);
	system("git push origin main");
	printf("data pushed successfully\n");
}
