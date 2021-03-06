var CAST_APP_ID = "938337b2-f581-41c4-b2c4-73e9cbe9e7ea";

var receiver = new cast.receiver.Receiver(CAST_APP_ID, [cast.receiver.RemoteMedia.NAMESPACE], "", 5);

var remoteMedia = new cast.receiver.RemoteMedia();
remoteMedia.addChannelFactory(receiver.createChannelFactory(cast.receiver.RemoteMedia.NAMESPACE));

define(function() {
    return ['$scope', '$timeout', function ($scope, $timeout) {
        var $localVideo = $('#localVideo'),
            $third = $('#third'),
            $flash = $('#flash'),
            $logo = $('#logo'),
            logoTimeout,
            quitTimeout;

        startQuit();

        $scope.video = {
            name: 'The Video Name'
        };

        remoteMedia.setMediaElement($localVideo[0]);
        
        $localVideo.on("loadedmetadata", function() {
            $scope.$apply(function() {
                $scope.video.name = remoteMedia.getTitle();
                $third.addClass('show');
                setTimeout(function() {
                    $third.removeClass('show');
                }, 5000);
            });
        });
        
        $localVideo.on('play', function() {
            flash('play');
            cancelQuit();
            hideLogo();
        });
        
        $localVideo.on('pause', function() {
            flash('pause');
            startQuit();
            showLogo();
        });
        
        function flash(type) {
            $scope.$apply(function() {
                $scope.flash = type;
                $flash.addClass('show');
                setTimeout(function() {
                    $flash.removeClass('show');
                }, 1000);
            });
        }
        
        receiver.start();

        function startQuit() {
            quitTimeout = $timeout(function() {
                window.close();
            }, 5 * 60 * 1000);
        }

        function cancelQuit() {
            $timeout.cancel(quitTimeout);
        }

        function showLogo() {
            logoTimeout = $timeout(function() {
                $logo.addClass('show');
            }, 10 * 1000);
        }

        function hideLogo() {
            $timeout.cancel(logoTimeout);
            $logo.removeClass('show');
        }
    }];
});
