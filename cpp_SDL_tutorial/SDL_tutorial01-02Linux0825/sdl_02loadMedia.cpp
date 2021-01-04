#include <SDL2/SDL.h>
#include <stdio.h>
#include "sdl_02loadMedia.h"

//The image we will load and show on the screen
SDL_Surface* gLoadHelloWorld = NULL;

SDL_Surface* loadMedia()
{
	//Load splash image
	gLoadHelloWorld = SDL_LoadBMP( "imgs/hello_world.bmp" );
	if( gLoadHelloWorld == NULL )
	{
		printf( "Unable to load image %s! SDL Error: %s\n", "imgs/hello_world.bmp", SDL_GetError() );
	}

	return gLoadHelloWorld;
}

