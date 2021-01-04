/*This source code copyrighted by Lazy Foo' Productions (2004-2013)
and may not be redistributed without written permission.*/
//Version: 013

#include "LUtil.h"
#include <IL/il.h>
#include <IL/ilu.h>
#include "LTexture.h"

//OpenGL texture
LTexture gRotatingTexture;

//Rotation Angle
GLfloat gAngle = 0.f;

//Transformation state
int gTransformationCombo = 0;

bool initGL()
{
    //Set the viewport
    glViewport( 0.f, 0.f, SCREEN_WIDTH, SCREEN_HEIGHT );

    //Initialize Projection Matrix
    glMatrixMode( GL_PROJECTION );
    glLoadIdentity();
    glOrtho( 0.0, SCREEN_WIDTH, SCREEN_HEIGHT, 0.0, 1.0, -1.0 );

    //Initialize Modelview Matrix
    glMatrixMode( GL_MODELVIEW );
    glLoadIdentity();

    //Initialize clear color
    glClearColor( 0.f, 0.f, 0.f, 1.f );

    //Enable texturing
    glEnable( GL_TEXTURE_2D );

    //Set blending
    glEnable( GL_BLEND );
    glDisable( GL_DEPTH_TEST );
    glBlendFunc( GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA );

    //Check for error
    GLenum error = glGetError();
    if( error != GL_NO_ERROR )
    {
        printf( "Error initializing OpenGL! %s\n", gluErrorString( error ) );
        return false;
    }

    //Initialize DevIL and DevILU
    ilInit();
    iluInit();
    ilClearColour( 255, 255, 255, 000 );

    //Check for error
    ILenum ilError = ilGetError();
    if( ilError != IL_NO_ERROR )
    {
        printf( "Error initializing DevIL! %s\n", iluErrorString( ilError ) );
        return false;
    }

    return true;
}

bool loadMedia()
{
    //Load texture
    if( !gRotatingTexture.loadTextureFromFile( "texture.png" ) )
    {
        printf( "Unable to load OpenGL texture!\n" );
        return false;
    }

    return true;
}

void update()
{
    //Rotate
    gAngle += 360.f / SCREEN_FPS;

    //Cap angle
    if( gAngle > 360.f )
    {
        gAngle -= 360.f;
    }
}

void render()
{
    //Clear color buffer
    glClear( GL_COLOR_BUFFER_BIT );

    //Reset transformation
    glLoadIdentity();

    //Render current scene transformation
    switch( gTransformationCombo )
    {
        case 0:
            glTranslatef( SCREEN_WIDTH / 2.f, SCREEN_HEIGHT / 2.f, 0.f );
            glRotatef( gAngle, 0.f, 0.f, 1.f );
            glScalef( 2.f, 2.f, 0.f );
            glTranslatef( gRotatingTexture.imageWidth() / -2.f, gRotatingTexture.imageHeight() / -2.f, 0.f );
        break;

        case 1:
            glTranslatef( SCREEN_WIDTH / 2.f, SCREEN_HEIGHT / 2.f, 0.f );
            glRotatef( gAngle, 0.f, 0.f, 1.f );
            glTranslatef( gRotatingTexture.imageWidth() / -2.f, gRotatingTexture.imageHeight() / -2.f, 0.f );
            glScalef( 2.f, 2.f, 0.f );
        break;

        case 2:
            glScalef( 2.f, 2.f, 0.f );
            glTranslatef( SCREEN_WIDTH / 2.f, SCREEN_HEIGHT / 2.f, 0.f );
            glRotatef( gAngle, 0.f, 0.f, 1.f );
            glTranslatef( gRotatingTexture.imageWidth() / -2.f, gRotatingTexture.imageHeight() / -2.f, 0.f );
        break;

        case 3:
            glTranslatef( SCREEN_WIDTH / 2.f, SCREEN_HEIGHT / 2.f, 0.f );
            glRotatef( gAngle, 0.f, 0.f, 1.f );
            glScalef( 2.f, 2.f, 0.f );
        break;

        case 4:
            glRotatef( gAngle, 0.f, 0.f, 1.f );
            glTranslatef( SCREEN_WIDTH / 2.f, SCREEN_HEIGHT / 2.f, 0.f );
            glScalef( 2.f, 2.f, 0.f );
            glTranslatef( gRotatingTexture.imageWidth() / -2.f, gRotatingTexture.imageHeight() / -2.f, 0.f );
        break;
    }

    //Render texture
    gRotatingTexture.render( 0.f, 0.f );

    //Update screen
    glutSwapBuffers();
}

void handleKeys( unsigned char key, int x, int y )
{
    //If q is pressed
    if( key == 'q' )
    {
        //Reset rotation
        gAngle = 0.f;

        //Cycle through combinations
        gTransformationCombo++;
        if( gTransformationCombo > 4 )
        {
            gTransformationCombo = 0;
        }
    }
}
