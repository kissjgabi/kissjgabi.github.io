/*This source code copyrighted by Lazy Foo' Productions (2004-2013)
and may not be redistributed without written permission.*/
//Version: 018

#ifndef LUTIL_H
#define LUTIL_H

#include "LOpenGL.h"
#include <stdio.h>

//Screen constants
const int SCREEN_WIDTH = 640;
const int SCREEN_HEIGHT = 480;
const int SCREEN_FPS = 60;

//Aliasing methods
enum AliasMode
{
	ALIAS_MODE_ALIASED,
	ALIAS_MODE_ANTIALIASED,
	ALIAS_MODE_MULTISAMPLE
};

bool initGL();
/*
Pre Condition:
 -A valid OpenGL context
Post Condition:
 -Initializes viewport, matrices, and clear color
 -Enables blending
 -Disables depth testing
 -Initializes GLEW
 -Initializes DevIL and DevIL utilities
 -Reports to console if there was an OpenGL error
 -Reports to console if there was a GLEW error
 -Reports to console if there was a DevIL error
 -Returns false if there was an error in initialization
 -Disables multisampling
 -Disables antialiasing
 -Set poygon/line smooth to nicest
Side Effects:
 -Sets viewport to the fill rendering area
 -Projection matrix is set to an orthographic matrix
 -Modelview matrix is set to identity matrix
 -Matrix mode is set to modelview
 -Clear color is set to black
 -Texturing is enabled
 -Sets DevIL clear color to transparent white
 -Initializes FreeType rendering
*/

bool loadMedia();
/*
Pre Condition:
 -A valid OpenGL context
Post Condition:
 -Loads media to use in the program
 -Reports to console if there was an error in loading the media
 -Returns true if the media loaded successfully
Side Effects:
 -None
*/

void update();
/*
Pre Condition:
 -None
Post Condition:
 -Does per frame logic
Side Effects:
 -None
*/

void render();
/*
Pre Condition:
 -A valid OpenGL context
 -Active modelview matrix
Post Condition:
 -Renders the scene
Side Effects:
 -Clears the color buffer
 -Swaps the front/back buffer
*/

void handleKeys( unsigned char key, int x, int y );
/*
Pre Condition:
 -None
Post Condition:
 -Renders scene to frame buffer
Side Effects:
 -None
*/

#endif
