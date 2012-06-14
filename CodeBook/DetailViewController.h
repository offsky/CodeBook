//
//  DetailViewController.h
//  CodeBook
//
//  Created by Chris Griffin on 6/14/12.
//  Copyright (c) 2012 33 Keys, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DetailViewController : UIViewController <UISplitViewControllerDelegate>

@property (strong, nonatomic) id detailItem;

@property (strong, nonatomic) IBOutlet UIWebView	*webView;

@end
