//
//  InfoViewController.m
//  CodeBook
//
//  Created by Chris Griffin on 6/15/12.
//  Copyright (c) 2012 33 Keys, Inc. All rights reserved.
//

#import "InfoViewController.h"

@interface InfoViewController ()

@end

@implementation InfoViewController

@synthesize detailItem													=	_detailItem;
@synthesize webView														=	_webView;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];

	NSString	*fileName = [self.detailItem objectForKey:@"INFO"];
	NSString *path = [[NSBundle mainBundle] bundlePath];
	NSString *finalPath = [path stringByAppendingPathComponent:fileName];
	
    NSData* data = [[NSData alloc] initWithContentsOfFile:finalPath];
    [self.webView loadData:data MIMEType:@"text/html" textEncodingName:@"UTF-8" baseURL:[NSURL fileURLWithPath:path]];
	[data release];
    
    //self.navigationController.navigationBar.tintColor = [UIColor blackColor];

    
//	self.title = [self.detailItem objectForKey:@"TITLE"];
//    self.navigationItem.title = @"A custom title";
}

- (void)viewDidAppear:(BOOL)animated
{
	[super viewDidAppear:animated];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
	    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
	} else {
	    return YES;
	}

}

- (IBAction)doneButton:(id)sender
{
	[self dismissModalViewControllerAnimated:YES];
}


@end
