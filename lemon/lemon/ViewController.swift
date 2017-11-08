//
//  ViewController.swift
//  lemon
//
//  Created by hexianjun on 2017/11/6.
//  Copyright © 2017年 hexianjun. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet var webview: [UIWebView]!
    @IBOutlet weak var click: UIButton!
    @IBAction func doClick(_ sender: Any) {
        let alert = UIAlertController(title: "test", message: "test", preferredStyle: .alert)
        self.present(alert, animated: true, completion: nil)
    }
    
    @IBAction func test(_ sender: Any) {
        let alertController = UIAlertController(title: "i am a close window", message: "lala", preferredStyle: .alert)
        let cancelAlert = UIAlertAction(title: "cancel", style: .cancel, handler: nil)
        let okAction = UIAlertAction(title: "ok", style: .default){ (action) in
            print("点击了确定")
        }
        alertController.addAction(cancelAlert)
        alertController.addAction(okAction)
        self.present(alertController, animated: true, completion: nil)
    }
    
    @IBAction func doClick2(_ sender: Any){
        let alert = UIAlertController(title: "test2", message: "test2", preferredStyle: .alert)
        self.present(alert, animated: true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    @IBAction func but1(_ sender: Any) {
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

