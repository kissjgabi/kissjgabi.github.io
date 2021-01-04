#include <stdio.h>
#include "sdl_02.h"
#include "sdl_02init.h"
#include "sdl_02loadMedia.h"
#include "sdl_02close.h"

//The window we'll be rendering to
SDL_Window* gWindow = NULL;

//The surface contained by the window
SDL_Surface* gScreenSurface = NULL;

//The image we will load and show on the screen
SDL_Surface* gHelloWorld = NULL;

int sdl02()
{
	if( (gWindow = init()) == NULL  )
	{
		printf( "Failed to initialize!\n" );
	}
	else
	{
        //Get window surface
        gScreenSurface = SDL_GetWindowSurface( gWindow );
		//Load media
		if( (gHelloWorld = loadMedia()) == NULL )
		{
			printf( "Failed to load media!\n" );
		}
		else
		{
			//Apply the image
			SDL_BlitSurface( gHelloWorld, NULL, gScreenSurface, NULL );

			//Update the surface
			SDL_UpdateWindowSurface( gWindow );

			//Wait two seconds
			SDL_Delay( 2000 );
		}
	}

	//Free resources and close SDL
	close(gWindow, gHelloWorld);
	return 0;
}
