# NYU Communities of Practice

The repository and current home for the NYU Communities of Practice website.

## Contributing / Development

Dependencies:
* Ruby v2.2.3
* Node.js / NPM
* Bower

To satisfy the ruby dependency, I recommend using <https://rvm.io/>:

    rvm install ruby-2.2.3
    gem install bundler

To get started, clone this repository's `master` branch

    git clone https://github.com/NYUTorchTech/cop.git

From the new `cop` directory, run:

    bundle install
    npm install
    bower install

Create a branch for your edits (never do work on `master`! :) ):

    git checkout -b myname-myedits

Open in your favorite editor and code away!

When you're ready,

## Building and running the project with gulp

Default task: Builds and serves the project locally. Watches for file updates.

    gulp

`publish` task: Builds the project for publishing to production, does not serve it.

    gulp publish

    # To serve a production build, follow the build command with:
    gulp serve:prod
    # [BUG] Images are broken when serving prod locally

`deploy` task: Deploys the site built with `publish` to this repository's `gh-pages` branch

    gulp deploy

### To deploy changes to the php form script:

`phpscript` task: does everything publish does, but uses the _config.phpscript.yml config file, which serves to a root directory on my server.

    gulp phpscript

`rsync` task*: Deploys to a server (not github). Currently specifically syncs the site to <http://cop.jann.ae>

    gulp rsync

*This task depends on a credentials file in your root directory.

    cp rsync.json.example ._rsync.json

Edit the new `._rsync.json` file to include the necessary information for an rsync deploy. **DO NOT COMMIT THE `._rsync.json` FILE**
