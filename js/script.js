let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty("--vh", `${vh}px`);

const debauncehandleResize = () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
};


window.addEventListener('resize', debauncehandleResize);



    





$(document).on('keyup', function(e) {
    if (e.keyCode == 27) {
        if ($('.record').length) {
            $('.record').hide();
        }

        if ($('.jqmOverlay').length) {
            $('.jqmOverlay').hide();
        }


        $('body').css({
            'overflow': '',
            'height': ''
        });
    }
});


$('body').on('click', '.jqmClose', function() {
    $('.jqmOverlay').hide();
    $('.record').hide();

    $('body').css({
        'overflow': '',
        'height': ''
    });
});

$(document).ready(function() {


    /* animated labels */
    $('.animated-labels input,.animated-labels textarea,.animated-labels select').each(function() {
        var value = $(this).val();

        if (value) {
            $(this).closest(".animated-labels").addClass("input-filed");
        }
    });

    $(document).on("focus", ".animated-labels input,.animated-labels textarea,.animated-labels select", function() {
        $(this).closest(".animated-labels").addClass("input-filed");
    }).on("focusout", ".animated-labels input,.animated-labels textarea", function() {
        if ("" != $(this).val())
            $(this).closest(".animated-labels").addClass("input-filed");
        else
            $(this).closest(".animated-labels").removeClass("input-filed");
    }).on('click', '.animated-labels .calendar-icon', function() {
        $(this).closest(".animated-labels").addClass("input-filed");
    })



    if ($('.tabs__caption').length) {
        $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        });

        var tabIndex = window.location.hash.replace('#tab', '') - 1;
        if (tabIndex != -1) $('ul.tabs__caption li').eq(tabIndex).click();

        /*
        $('a[href*=#tab]').click(function () {
            var tabIndex = $(this).attr('href').replace(/(.*)#tab/, '') - 1;
            $('ul.tabs__caption li').eq(tabIndex).click();
        });

         */
    }



    $('body').css({
        'overflow': 'hidden',
        'height': '100vh'
    });

    $('<div class="jqmOverlay waiting"></div>').appendTo('body');

    if ($('.record').length) {
        $('.record-content-container').mCustomScrollbar({
            mouseWheel: {
                preventDefault: true
            },
            advanced: {
                autoScrollOnFocus: false
            },
        });
    }

    $('form[name="record"]').validate({
        highlight: function(element) {
            $(element).parent().addClass('error');
        },
        unhighlight: function(element) {
            $(element).parent().removeClass('error');
        },
        submitHandler: function(form) {
            if ($('form[name="record"]').valid()) {
                setTimeout(function() {
                    $(form).find('input[type="submit"]').attr("disabled", "disabled");
                }, 300);
                var eventdata = {
                    type: 'form-submit',
                    form: form,
                    form_name: 'form[name="record"]'
                };


                eventdata.form.submit();
                $(eventdata.form).closest('.form').addClass('sending');
                return true;
            }
        },
        errorPlacement: function(error, element) {
            if ($(element).closest('.licence_block').length) {
                $(element).closest('.licence_block').append(error);
            } else {
                if ($(element).closest('.licence_block').length) {
                    $(element).closest('.licence_block').append(error);
                } else {
                    error.insertAfter(element);
                }
            }
        },
        messages: {
            licenses_popup: {
                required: 'Необходимо согласиться с условия обработкой персональных данных'
            }
        }
    });

    if ($('form input.phone').length) {
        var base_mask = '+7 (999) 999-99-99'.replace(/(\d)/g, '_');
        $('form input.phone').inputmask('mask', {
            'mask': '+7 (999) 999-99-99',
            'showMaskOnHover': false
        });
        $('form input.phone').blur(function() {
            if ($(this).val() == base_mask || $(this).val() == '') {
                if ($(this).hasClass('required')) {
                    $(this).parent().find('div.error').html('Укажите корректный номер телефон');
                }
            }
        });
    }

    $('form[name="feedback"]').validate({
        highlight: function(element) {
            $(element).parent().addClass('error');
        },
        unhighlight: function(element) {
            $(element).parent().removeClass('error');
        },
        submitHandler: function(form) {
            if ($('form[name="feedback"]').valid()) {
                setTimeout(function() {
                    $(form).find('input[type="submit"]').attr("disabled", "disabled");
                }, 300);
                var eventdata = {
                    type: 'form-submit',
                    form: form,
                    form_name: 'form[name="feedback"]'
                };


                eventdata.form.submit();
                $(eventdata.form).closest('.form').addClass('sending');
                return true;
            }
        },
        errorPlacement: function(error, element) {
            if ($(element).closest('.licence_block').length) {
                $(element).closest('.licence_block').append(error);
            } else {
                if ($(element).closest('.licence_block').length) {
                    $(element).closest('.licence_block').append(error);
                } else {
                    error.insertAfter(element);
                }
            }
        }
    });

    if ($('form input.phone').length) {
        var base_mask = '+7 (999) 999-99-99'.replace(/(\d)/g, '_');
        $('form input.phone').inputmask('mask', {
            'mask': '+7 (999) 999-99-99',
            'showMaskOnHover': false
        });
        $('form input.phone').blur(function() {
            if ($(this).val() == base_mask || $(this).val() == '') {
                if ($(this).hasClass('required')) {
                    $(this).parent().find('div.error').html('Укажите корректный номер телефон');
                }
            }
        });
    }


    $('a.js-hadler-btn[href^="#"]').on('click', function(e) {
        e.preventDefault();
        let id = $(this).attr('href');
        console.log(id)

        $(id).show();
    });



                     
    // ymaps.ready(initStoresBigMap);

    var myMap = null;

    const visitedPlacemarks = [];

    function initStoresBigMap () {

        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                setMarkers(data);
            });


        var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<a class="baloon-content-wrapper" target="__blank" href="$[properties.ballonUrl]">' +
            '<div class="baloon-photo"> <img src="$[properties.ballonImg]" /> </div>' +
            '<div class="baloon-content"> <div class="ballon-content-inner">' +
            '<h3 class="baloon-title"><strong>$[properties.balloonName],</strong> $[properties.ballonSquare] м<sup>2</sup></h3>' +
            '<span class="ballon-price">$[properties.baloonPriceFormated] ₽</span>' +
            '<span class="ballon-adress">$[properties.balloonAdress]</span>' +
            '</div>' +
            '</div>' +
            '</a>'
        );

        
        myMap = new ymaps.Map('stores-big-map', {
                center: [55.751574, 37.573856],
                zoom: 9,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            }),
   
                clusterer = new ymaps.Clusterer({
            
                preset: 'islands#blueClusterIcons',
                clusterIconColor: '#1EADD7',
             
                groupByCoordinates: false,
            
                clusterDisableClickZoom: false,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false,
                hasBalloon: false
            }),
     
                getPointData = function (index, id) {
                return {
                    balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
                    balloonContentBody: '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
                    balloonContentFooter: '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' + index + '</strong>',
                    clusterCaption: 'метка <strong>' + index + '</strong>',
                    id: id
                };
            },
         
                getPointOptions = function () {
                return {
                    // balloonContentLayout: MyBalloonContentLayout,
                    iconLayout: 'default#image',
                    iconImageHref: 'img/loc.svg',
                    iconImageSize: [30, 43],
                    iconImageOffset: [-5, -42],
                    hasBalloon: false
                };
            },
           
            geoObjects = [];

      
        
            function setMarkers(dots) {
                

                dots = Object.values(dots);
             
                
                for(var i = 0, len = dots.length; i < len; i++) {
                    geoObjects[i] = new ymaps.Placemark(dots[i].coordinates, getPointData(i, dots[i].id), getPointOptions());
                }


                clusterer.options.set({
                    gridSize: 80,
                    clusterDisableClickZoom: true
                });
        
        
                clusterer.add(geoObjects);
                myMap.geoObjects.add(clusterer);
        
        
        
                myMap.setBounds(clusterer.getBounds(),{checkZoomRange:true, zoomMargin: 40});
        
        
                // clusterer.events.add(['mouseenter', 'mouseleave'], function (e) {
                //     var target = e.get('target'),
                //         type = e.get('type'); 
        
        
                //         if(target.state._data.active === undefined || target.state._data.active === false) {
                //             if (type == 'mouseenter') {
                //                 target.options.set('iconImageHref', 'img/loc-hover.svg',); 
                //             }  else {
                //                 target.options.set('iconImageHref', 'img/loc.svg',); 
                //             } 
                //         }
                    
                // });


                
        
        
                clusterer.events.add(['click'], function (e) {
                    var target = e.get('target'),
                        type = e.get('type'); 
        
        
                        console.log(target.properties._data.id )

                        visitedPlacemarks.push(target);
        
                        target.options.set('iconImageHref', 'img/loc-hover.svg'); 

                        storeModalHandle(target.properties._data.id);
        
                });


                // $(document).mouseup(function(e) {
                //     var container = $(".js-store-modal");
            
                //     if (container.has(e.target).length === 0 && $('.js-store-modal').attr('style') === 'display: none;') {
                //         visitedPlacemarks.forEach(function(placemark) {
                //             placemark.options.set('iconImageHref', 'img/loc.svg',); 
                //         })
                //     }
            
                // })

            }


    } 



    function storeModalHandle(id) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                viewStoreModal(data);
            });


        function viewStoreModal(data) {

            Array.from(data).forEach(function(el) {
                if(el.id === id) {
                    $('.js-store-name').text(el.name);
                    $('.js-store-adress').text(el.adress);
                    $('.js-store-time').text(el.deliveryTime);

                    $('.js-store-modal').show();
                }
            });

            
        }    
    }
   



    $('a.js-tab-hadler-btn[href^="#"]').on('click', function(e) {
        e.preventDefault();
        let id = $(this).attr('href');
        
        $('.tabs__content').hide();

        $(id).show();

        setTimeout(function() {
            ymaps.ready(initStoresBigMap);
        }, 600)
       
    });

    $('.record-back').on('click', function(e) {
        e.preventDefault();

        $(this).parents('.record').hide();
    });


    $('.close-modal').on('click', function(e) {
        e.preventDefault();

        $(this).parents('.modal').hide();

        visitedPlacemarks.forEach(function(placemark) {
            placemark.options.set('iconImageHref', 'img/loc.svg',); 
        })
    });




    function setDateInfo() {
        const dayNum = $(this).attr('data-day-num');
        const dayOfWeek = $(this).attr('data-day-week'); 
        const month = $(this).attr('data-month'); 

        $('[data-target="day-num"]').text(dayNum);
        $('[data-target="day-name"]').text(dayOfWeek);
        $('[data-target="day-month"]').text(month);
    }

    function setTabContent() {
        const tabID = $(this).attr('data-tab-id');
        
        $('.calendar-content-tab').hide();
        $(`.calendar-content-tab[data-tab-content-id="${tabID}"]`).show();
    }

    $('.calendar-dates').on('click', '.calendar-tab', function(e) {
        e.preventDefault();
        $('.calendar-tab').not(this).removeClass('active');
        $(this).addClass('active');

        setDateInfo.call(this);
        setTabContent.call(this);
    });

    $('.calendar-next').on('click', function(e) {
        e.preventDefault();
        $('.calendar-tab.active').parents('li').next().find('.calendar-tab').click();
    });

    $('.calendar-prev').on('click', function(e) {
        e.preventDefault();
        $('.calendar-tab.active').parents('li').prev().find('.calendar-tab').click();
    });

    function changeResultText() {
        let grade = $('.designer-assessment-stars svg.filled').length;
        
        switch (grade) {
            case 1: 
                $('.js-designer-assesment-result').text('Плохо');
                break;

            case 2: 
                $('.js-designer-assesment-result').text('Нормально');
                break; 
                
            case 3: 
                $('.js-designer-assesment-result').text('Хорошо');
                break;  
            
            case 4: 
                $('.js-designer-assesment-result').text('Хорошо');
                break;
            
            case 5: 
                $('.js-designer-assesment-result').text('Отлично');
                break;
        }
    }


    $('.js-designer-assessment-handle').on('click', '.designer-assessment-stars svg', function() {
        $(this).addClass('filled');

        const fillPrevStars = (star) => {
            if(star.length !== 0) {
                star.prev().addClass('filled');
                fillPrevStars(star.prev());
            }
        }


        const fillNextStars = (star) => {
            if(star.length !== 0) {
                star.next().removeClass('filled');
                fillNextStars(star.next());
            }
        }

        fillPrevStars($(this));
        fillNextStars($(this));

        changeResultText();
    });


    $('.js-close-popup').on('click', function(e) {
        e.preventDefault();
        $(this).parents('.popup-overlay').hide();
    });


    $(document).mouseup(function(e) {
        var container = $(".popup");

        if (container.has(e.target).length === 0) {
            container.parents('.popup-overlay').hide();
        }

    });


    $('.place-review').on('submit', function(e) {
        e.preventDefault();

        $(this).parents('.record').find('.record-back').click();

        $('#thanks-popup').show();
    });


});