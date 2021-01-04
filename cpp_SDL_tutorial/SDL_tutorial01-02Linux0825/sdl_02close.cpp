#include <SDL2/SDL.h>
#include "sdl_02loadMedia.h"
#include "sdl_02close.h"

void close(SDL_Window* gWindow, SDL_Surface* gHelloWorld)
{
	//Deallocate surface
	SDL_FreeSurface( gHelloWorld );
	gHelloWorld = NULL;

	//Destroy window
	SDL_DestroyWindow( gWindow );
	gWindow = NULL;

	//Quit SDL subsystems
	SDL_Quit();
}

