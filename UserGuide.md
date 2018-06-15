# Trial Account User Guide

![](images/userguide/Picture-Title.png)
Updated: April 17, 2018

## Workshop Introduction

This Oracle Public Cloud **AMCe with Push Notifications workshop** will walk you through the Software Development Lifecycle (SDLC) for a native mobile application built using Oracle's **Autonomous Mobile Cloud Enterprise (AMCe)**, including **Push Notifications** as well as several other key microservices provided by the platform. 

During the workshop you will be building a "sideband" notification channel between an "admin" web application and a "client" native mobile application. This will be accomplished in 3 main phases. In phase 1,you will create the initial mobile application and, in doing so, set up the AMCe project which we will use as our complete backend solution. Then, in phase 2, we will complete the initial implementation of our mobile app by taking the last steps needed to enable our mobile device to recieve push notifications sent from our AMCe environment. Finally, in the bonus lab, we will deploy an "admin" web application which we will use to send push notifications to our mobile device instead of AMCe.

Completing this workshop will provide in depth exposure to Oracle **Autonomous Mobile Cloud Enterprise (AMCe)** and Oracle **Application Container Cloud Service (ACCS)**, two powerful cloud enterprise for building enterprise grade applications. Lastly, during the course of this workshop you gain valuable experience using popular open-source technologies together with proprietary tools to develop full-stack applications.

- You can see a list of Lab Guides by clicking on the **Menu Icon**

    ![](images/WorkshopMenu.png)

- To log issues and view the Lab Guide source, go to the [github oracle](https://github.com/oracle/learning-library/issues/new) repository.

- Visit the [Workshop Interactive Labguide](https://launch.oracle.com/?microservices-devops) for a visual overview of the workshop content.

- All setup steps and lab replays have been posted on [youtube](https://www.youtube.com/playlist?list=PLPIzp-E1msrZhDmRUnNBSYY6LJ2yWh3Ro). You can **watch the videos** to gain an overview of the workshop and what's required to successfully complete the labs.

# Workshop Prerequisites

## _Acquire an Oracle Cloud Trial Account_

### **Step 1**: Getting your Trial Account

- Click on this URL [cloud.oracle.com/tryit](http://cloud.oracle.com/tryit&intcmp=DeveloperInnovation-HOL-11NOV17), and complete all the required steps to get your free Oracle Cloud Trial Account.
- You must wait to receive our account before continuing to the "**Configure Oracle Cloud Identity Information**" Section.

## _Configure Oracle Cloud Identity Information_

### **Step 2**: Record information from the welcome email and login

- During the provisioning of your account, you will receive two welcome email message. ***Note: You must wait for the 2nd email shown below***, as this email signals that your account is fully provisioned. If the second email does not appear within 30 minutes, please check your Junk or Promotions email folders (based on your email provider).

![](images/userguide/Picture199.1.png)

- For later use during the workshop labs, **record the following fields**, some of which you'll find in the email. This information will be ***used multiple times*** during the workshops Labs, so we recommend that you **copy the following list to a text document**, and then populate the fields as they are collected from the **Welcome Email** documented above.

```
Username:
Temporary Password:

Cloud Account Name:
Cloud Account Password:

```

- ***(1)*** **Username**: With a trial account, this should be your email address.
- ***(2)*** **Temporary Password**: The first time you login, you will use this temporary password.
- ***(3)*** **Cloud Account Name**: This name will be used when you login.
- **Cloud Account Password**: Once you reset your temporary password, record your new password.

### **Step 3**: Log into your Cloud Account

- Click on the link ***(4)*** **Get Started with Oracle Cloud** link provided in the email.
- Follow the instructions to **set your password**, and then record in your notes the new password for this **Cloud Account Password** field.

- You are now have viewing the dashboard used to access all the Cloud Services managed by the Oracle Identity Cloud Services.

- Click on the **Customize Dashboard** box to add the some select services to the Dashboard.

    ![](images/userguide/Picture200.2.png)

- Click on **Show** for the **Application Container**, **Developer**, **Identity Cloud**, **Compute Classic** and **Storage Classic** services. Then click the **X** in the top right corner to close the dialog.

    ![](images/userguide/Picture200.3.png)

    ![](images/userguide/Picture200.3.1.png)

    ![](images/userguide/Picture200.3.2.png)



### **Step 4**: Check/Set Storage Replication Policy

Some services that we will use in this workshop require that your account's Replication Policy is set. The following steps will show you how to set your replication policy.

- Click on the **Hamburger Menu** in the upper left corner of the browser window to expose the **Dashboard Menu**, then click on the **Storage Classic** menu option.

    ![](images/userguide/Picture201.png)

- If your replication policy has not yet been set, the following dialog will be displayed. Use the Default **Georeplication Policy**, and click on **Set Policy**.

    ![](images/userguide/Picture202.png)

- To return to the main **Dashboard**, click on the **Hamburger Menu**, and then click on the **My Services** menu option.

    ![](images/userguide/Picture204.png)


## Install Git

### **Step 5**: Download/Install Git

- Go to the following URL: https://git-scm.com/downloads

    ![](images/userguide/Picture8.png)

- Select your OS. In our example, we will show how to install on Windows. Click **Windows** Download and click **Save File**

    ![](images/userguide/Picture9.png)

- Select your download location and click **Save**. We will use D:\Software    

    ![](images/userguide/Picture10.png)

- Open Windows Explorer and navigate to where you downloaded the Git executable. Double click on the Git executable to start the install process.

    ![](images/userguide/Picture11.png)

- Run through the installation process. In our tests, we used the default installation settings.

    ![](images/userguide/Picture12.png)

## Get Started on Lab 100

### **Step 6**: Load Lab 100

- Cick on the dropdown menu in the top left corner of the screen.

    ![](images/userguide/Picture219.png)

- Select **Lab 100** to continue to your next section of this workshop.

    ![](images/userguide/Picture220.png)