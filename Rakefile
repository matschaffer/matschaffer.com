require 'yaml'

def jekyll(*opts)
  jekyll = Dir["_jekyll/bin/jekyll"].first || "jekyll"
  sh "bundle", "exec", jekyll, *opts
end

desc "Clean the built site"
task :clean do
  sh "rm -rf _site"
end

desc "Run Jekyll in server mode"
task :serve do
  jekyll "serve"
end

desc "Run a build of jekyll"
task :build do
  jekyll "build"
  cp "_htaccess", "_site/.htaccess"
  cp "_well-known", "_site/.well-known"
end

desc "Deploy to deploy_path specified in config.yml"
task :deploy => :build do
  sh "rsync -rtz --delete _site/ " + YAML.load_file("_config.yml")['deploy_path']
end

desc "Make a new post"
task :new do
  require 'highline/import'
  slug_input = ask('Slug: ')
  slug = slug_input.gsub(/\s+/, '-').downcase
  today = Time.now.strftime('%Y-%m-%d')
  post = "_posts/#{today}-#{slug}.md"
  File.open(post, 'w') do |post|
    post.puts <<-MD.gsub(/^\s+/, '')
      ---
      layout: post
      title: #{slug_input}
      abstract: #{slug}
      ---

    MD
  end
  exec "#{ENV['EDITOR']} #{post}"
end

desc "Redates the most recent post to today"
task :redate do
  require 'fileutils'
  last = Dir["_posts/*.md"].last
  today = Time.now.strftime('%Y-%m-%d')
  redated = last.gsub(%r{^_posts/\d+-\d+-\d+}, "_posts/#{today}")
  FileUtils.mv(last, redated) unless last == redated
end

desc "Alias for redate and deploy"
task :publish => [:redate, :deploy]

task :default => :serve
