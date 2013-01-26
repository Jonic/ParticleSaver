//
//  ParticlesSaverView.m
//  ParticlesSaver
//
//  Created by Jonic Linley on 26/01/2013.
//  Copyright (c) 2013 HelicopterExplosion. All rights reserved.
//

#import "ParticlesSaverView.h"

@implementation ParticlesSaverView

- (id)initWithFrame:(NSRect)frame isPreview:(BOOL)isPreview
{
    self = [super initWithFrame:frame isPreview:isPreview];
    if (self) {
        [self setAnimationTimeInterval:1/30.0];
    }
    return self;
}

- (void)startAnimation
{
    [super startAnimation];
}

- (void)stopAnimation
{
    [super stopAnimation];
}

- (void)drawRect:(NSRect)rect
{
    [super drawRect:rect];
}

- (void)animateOneFrame
{
    return;
}

- (BOOL)hasConfigureSheet
{
    return NO;
}

- (NSWindow*)configureSheet
{
    return nil;
}

@end
