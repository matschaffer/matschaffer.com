require 'yaml'

def jekyll(opts = nil)
  jekyll = Dir["_jekyll/bin/jekyll"].first || "jekyll"
  sh [jekyll, opts].join(" ")
end

desc "Clean the built site"
task :clean do
  sh "rm -rf _site"
end

desc "Run Jekyll in server mode"
task :serve do
  jekyll "serve -w"
end

desc "Run a build of jekyll"
task :build do
  jekyll
  cp "_htaccess", "_site/.htaccess"
end

desc "Deploy to deploy_path specified in config.yml"
task :deploy => :build do
  sh "rsync -rtz --delete _site/ " + YAML.load_file("_config.yml")['deploy_path']
end

task :default => :auto
