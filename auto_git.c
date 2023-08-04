#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
	time_t Time = time(NULL);
	struct tm* t = localtime(&Time);
	char commit[100];
	if(system("git add *") == 0){
		system("git status");
		printf("\nare you sure you want to commit these?(y/n)");
		fflush(stdin);
		if(getchar() != 'y'){
			printf("[ Error : commit denied ]");
			return 0;
		}
	} else {
	       printf("[ ERROR : error caused while adding ]");
	       return 0;
	}
	snprintf(commit, sizeof(commit), "git commit -m '%02d/%02d(%02d:%02d)'", t->tm_mon+1, t->tm_mday, t->tm_hour, t->tm_min);
	if(system(commit) != 0){
		printf("[ ERROR : error caused while commiting ]");
		return 0;
	}
	if(system("git push origin main") != 0){
		printf("[ ERROR : error caused while commiting ]");
		return 0;
	}
	printf("[ data pushed successfully ]\n");
}
