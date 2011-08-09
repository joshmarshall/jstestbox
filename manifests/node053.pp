Exec {
    path => ["/bin", "/usr/bin", "/usr/local/bin"]
}

class node053 {

    package {
        "build-essential":
            ensure => present,
            before => Exec["get_node"];
        "python":
            ensure => present,
            before => Exec["get_node"];
        "libssl-dev":
            ensure => present,
            before => Exec["get_node"];
        "git-core":
            ensure => present;
        "node":
            provider => dpkg,
            ensure => latest,
            source => "/source/node_0.5.3_amd64.deb",
            require => Exec["get_node"];
    }

    file {
        "/source":
            ensure => directory;
        "/usr/local/bin/nodeunit":
            ensure => link,
            source => "/vagrant/node_modules/nodeunit/bin/nodeunit",
            require => Exec["install_nodeunit"];
    }

    exec {
        "get_node":
            path => ["/bin", "/usr/bin", "/usr/local/bin"],
            cwd => "/source",
            command => "wget http://c691331.r31.cf2.rackcdn.com/node_0.5.3_amd64.deb",
            creates => "/source/node_0.5.3_amd64.deb";
        "get_npm":
            cwd => "/source",
            path => ["/bin", "/usr/bin", "/usr/local/bin"],
            require => Package["git-core"],
            command => "git clone git://github.com/isaacs/npm.git",
            creates => "/source/npm";
        "install_npm":
            cwd => "/source/npm",
            command => "make install",
            path => ["/bin", "/usr/bin", "/usr/local/bin"],
            require => Exec["get_npm"],
            creates => "/usr/local/bin/npm";
        "install_jsdom":
            command => "npm install jsdom",
            cwd => "/vagrant",
            creates => "/vagrant/node_modules/jsdom",
            path => ["/bin", "/usr/bin", "/usr/local/bin"],
            require => Exec["install_npm"];
        "install_nodeunit":
            command => "npm install nodeunit",
            cwd => "/vagrant",
            creates => "/vagrant/node_modules/nodeunit",
            path => ["/bin", "/usr/bin", "/usr/local/bin"],
            require => Exec["install_npm"];
    }

}

