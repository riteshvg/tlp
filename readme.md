//initialize existing git repo 
git init

//add changes from local to stage for uploading 
git add .

//committing changes from local to stage for committing
git commit -m "notes"

//pushing changes to remote 
git push -u origin main

//in case remote is ahead of local
git push -f origin master

//checking for branches
git branch // main, master, my-feature

//changing branches
git checkout master //will change from active branch to master

//merging changes from remote to local
git branch -d my-feature
