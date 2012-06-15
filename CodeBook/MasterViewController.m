//
//  MasterViewController.m
//  CodeBook
//
//  Created by Chris Griffin on 6/14/12.
//  Copyright (c) 2012 33 Keys, Inc. All rights reserved.
//

#import "MasterViewController.h"

#import "DetailViewController.h"

@interface MasterViewController () {
    NSMutableArray *section1;
    NSMutableArray *section2;
    NSMutableArray *section3;
    NSMutableArray *section4;
}
@end

@implementation MasterViewController

@synthesize detailViewController = _detailViewController;

- (void)awakeFromNib
{
	if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad) {
	    self.clearsSelectionOnViewWillAppear = NO;
	    self.contentSizeForViewInPopover = CGSizeMake(320.0, 600.0);
	}
    [super awakeFromNib];
}

- (void)dealloc
{
	[_detailViewController release];
	[section1 release];
	[section2 release];
	[section3 release];
	[section4 release];
    [super dealloc];
}

- (void)viewDidLoad
{
    [super viewDidLoad];

	self.detailViewController = (DetailViewController *)[[self.splitViewController.viewControllers lastObject] topViewController];
    

    NSDictionary		*caesar = [NSDictionary dictionaryWithObjectsAndKeys:@"caesar.html", @"FILENAME", @"Caesar", @"TITLE", @"caesar-info.html", @"INFO", nil];
    NSDictionary		*atbash = [NSDictionary dictionaryWithObjectsAndKeys:@"atbash.html", @"FILENAME", @"Atbash", @"TITLE", @"atbash-info.html", @"INFO", nil];
	NSDictionary		*keyword = [NSDictionary dictionaryWithObjectsAndKeys:@"keyword.html", @"FILENAME", @"Keyword", @"TITLE", @"keyword-info.html", @"INFO", nil];
	NSDictionary		*polybius = [NSDictionary dictionaryWithObjectsAndKeys:@"polybius.html", @"FILENAME", @"Polybius Square", @"TITLE", @"polybius-info.html", @"INFO", nil];

    NSDictionary		*playfair = [NSDictionary dictionaryWithObjectsAndKeys:@"playfair.html", @"FILENAME", @"Playfair", @"TITLE", @"playfair-info.html", @"INFO", nil];
	NSDictionary		*bifid = [NSDictionary dictionaryWithObjectsAndKeys:@"bifid.html", @"FILENAME", @"Bifid", @"TITLE", @"bifid-info.html", @"INFO", nil];
	NSDictionary		*trifid = [NSDictionary dictionaryWithObjectsAndKeys:@"trifid.html", @"FILENAME", @"Trifid", @"TITLE", @"trifid-info.html", @"INFO", nil];

    NSDictionary		*railfence = [NSDictionary dictionaryWithObjectsAndKeys:@"railfence.html", @"FILENAME", @"Rail Fence", @"TITLE", @"railfence-info.html", @"INFO", nil];
	NSDictionary		*coltrans = [NSDictionary dictionaryWithObjectsAndKeys:@"coltrans.html", @"FILENAME", @"Columnar Transposition", @"TITLE", @"coltrans-info.html", @"INFO", nil];

    NSDictionary		*morse = [NSDictionary dictionaryWithObjectsAndKeys:@"morse.html", @"FILENAME", @"Morse Code", @"TITLE", @"morse-info.html", @"INFO", nil];
    NSDictionary		*tap = [NSDictionary dictionaryWithObjectsAndKeys:@"tap.html", @"FILENAME", @"Tap Code", @"TITLE", @"tap-info.html", @"INFO", nil];
    NSDictionary		*ascii = [NSDictionary dictionaryWithObjectsAndKeys:@"ascii.html", @"FILENAME", @"ASCII Code", @"TITLE", @"ascii-info.html", @"INFO", nil];

    self.navigationController.navigationBar.tintColor = nil;
    
	section1 = [[NSMutableArray alloc] initWithObjects:caesar, atbash, keyword, polybius, nil];
	section2 = [[NSMutableArray alloc] initWithObjects:playfair, bifid, trifid, nil];
	section3 = [[NSMutableArray alloc] initWithObjects:railfence, coltrans, nil];
	section4 = [[NSMutableArray alloc] initWithObjects:morse, tap, ascii, nil];
    
    if(UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        //TODO: Highlight section 0, row 0
	}
    
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (void)viewWillAppear:(BOOL)animated
{
    self.navigationController.navigationBar.tintColor = nil;

    [super viewWillAppear:animated];
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


#pragma mark - Table View

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
	return 4;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    if(section==0) return @"Monoalphabetic Ciphers";
    else if(section==1) return @"Polygraphic Ciphers";
    else if(section==2) return @"Transposition Ciphers";
    else if(section==3) return @"Codes";
    return @"";
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    if(section==0) return section1.count;
    else if(section==1) return section2.count;
    else if(section==2) return section3.count;
    else if(section==3) return section4.count;
    return 0;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];

    if(indexPath.section==0) {
        NSDictionary	*object = [section1 objectAtIndex:indexPath.row];
        cell.textLabel.text = [object objectForKey:@"TITLE"];
    } else if(indexPath.section==1) {
        NSDictionary	*object = [section2 objectAtIndex:indexPath.row];
        cell.textLabel.text = [object objectForKey:@"TITLE"];
    } else if(indexPath.section==2) {
        NSDictionary	*object = [section3 objectAtIndex:indexPath.row];
        cell.textLabel.text = [object objectForKey:@"TITLE"];
    } else if(indexPath.section==3) {
        NSDictionary	*object = [section4 objectAtIndex:indexPath.row];
        cell.textLabel.text = [object objectForKey:@"TITLE"];
    }
    
    return cell;
}

- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    return NO;
}


- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad) {
        if(indexPath.section==0) {
            NSDictionary *object = [section1 objectAtIndex:indexPath.row];
            self.detailViewController.detailItem = object;
        } else if(indexPath.section==1) {
             NSDictionary *object = [section2 objectAtIndex:indexPath.row];
             self.detailViewController.detailItem = object;
        } else if(indexPath.section==2) {
            NSDictionary *object = [section3 objectAtIndex:indexPath.row];
            self.detailViewController.detailItem = object;
        } else if(indexPath.section==3) {
            NSDictionary *object = [section4 objectAtIndex:indexPath.row];
            self.detailViewController.detailItem = object;
        }
    }
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([[segue identifier] isEqualToString:@"showDetail"]) {
        NSIndexPath *indexPath = [self.tableView indexPathForSelectedRow];
        if(indexPath.section==0) {
            NSDictionary *object = [section1 objectAtIndex:indexPath.row];
            [[segue destinationViewController] setDetailItem:object];
        } else if(indexPath.section==1) {
            NSDictionary *object = [section2 objectAtIndex:indexPath.row];
            [[segue destinationViewController] setDetailItem:object];
        } else if(indexPath.section==2) {
            NSDictionary *object = [section3 objectAtIndex:indexPath.row];
            [[segue destinationViewController] setDetailItem:object];
        } else if(indexPath.section==3) {
            NSDictionary *object = [section4 objectAtIndex:indexPath.row];
            [[segue destinationViewController] setDetailItem:object];
        }
    }
}

@end
