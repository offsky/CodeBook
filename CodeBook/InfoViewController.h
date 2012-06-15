//
//  InfoViewController.h
//  CodeBook
//
//  Created by Chris Griffin on 6/15/12.
//  Copyright (c) 2012 33 Keys, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface InfoViewController : UIViewController

@property (strong, nonatomic) id detailItem;

@property (strong, nonatomic) IBOutlet UIWebView	*webView;

- (IBAction)doneButton:(id)sender;

@end
