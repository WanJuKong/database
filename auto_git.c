#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
	time_t Time = time(NULL);
	struct tm* t = localtime(&Time);
	char commitCmd[100];
	char commitMsg[50];
	if(system("git add .") == 0){
		system("git status");
		printf("\nare you sure you want to commit these?(y/n)");
		fflush(stdin);
		if(getchar() != 'y'){
			printf("[ Error : commit denied ]\n");
			return 0;
		}
	} else {
	       printf("[ ERROR : error caused while adding ]\n");
	       return 0;
	}
	snprintf(commitMsg, sizeof(commitMsg),
			"%02d/%02d(%02d:%02d)",
			t->tm_mon + 1,
			t->tm_mday,
			t->tm_hour,
			t->tm_min
		);
	snprintf(commitCmd, sizeof(commitCmd), "git commit -m '%s'", commitMsg);
	if(system(commitCmd) != 0){
		printf("[ ERROR : error caused while commiting ]\n");
		return 0;
	}
	if(system("git push origin main") != 0){
		printf("[ ERROR : error caused while commiting ]\n");
		return 0;
	}
	printf("\n[ data pushed successfully ]\n commit message: '%s'\n", commitMsg);
}
