//
//  MasterViewController.h
//  CodeBook
//
//  Created by Chris Griffin on 6/14/12.
//  Copyright (c) 2012 33 Keys, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

@class DetailViewController;

@interface MasterViewController : UITableViewController

@property (strong, nonatomic) DetailViewController *detailViewController;

@end
