def jekyll(opts = nil)
  sh "rm -rf _site"
  sh ["jekyll", opts].join(" ")
  cp "_htaccess", "_site/.htaccess"
end

desc "Start in --auto mode"
task :auto do
  jekyll "--auto"
end

desc "Start in --auto --server mode"
task :server do
  jekyll "--auto --server"
end

desc "Run a build of jekyll "
task :build do
  jekyll
end

task :default => :auto
task :deploy => "deploy:local"

namespace :deploy do
  desc "Deploy to Dreamhost"
  task :dreamhost => :build do
    rsync "penguin.dreamhost.com:~/sites/matschaffer.com/jekyll"
  end

  desc "Deploy locally"
  task :local => :build do
    rsync "localhost:~/Sites/jekyll"
  end

  def rsync(destination)
    sh "rsync -rtz --delete _site/ #{destination}"
  end
end
