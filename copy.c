#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void){
	const char* copyFrom = "/var/www/html/sql";
	const char* copyTo = ".";
	char copy[100];
	snprintf(copy, sizeof(copy), "cp -r %s/* %s", copyFrom, copyTo);
	int result = system(copy);
	if(result == 0)
		printf("[ files copied successfully ]\n");
	else
		printf("[ ERROR : error code %d ]\n", result);
}
