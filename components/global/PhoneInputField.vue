<script lang="ts" setup>
import countryData from '~/data/countries.json';
import phoneMasks from '~/data/phone-masks.json';
import BaseInput from '~/components/Form/BaseInput.vue';

const props = defineProps({
    id: {
        type: String,
        default: 'phonenumber',
    },
    label: {
        type: String,
        default: '',
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
});

interface PhoneMask {
    code: string;
}

interface Country {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
}

const emit = defineEmits(['update:modelValue', 'countrySelected']);

const mainCountry = 'CH';
const mostUsedCountriesCodes = [mainCountry, 'DE', 'AT'];
const mostUsedCountries: Country[] = countryData.filter((c) => mostUsedCountriesCodes.includes(c.code));
const countries = ref<Country[]>(mostUsedCountries.concat(countryData));
let preselectedCountry: Country = mostUsedCountries.filter((c) => c.code === mainCountry)[0];
let preselectedCountryIndex = -1;
if (props.modelValue && props.modelValue.toString().startsWith('+')) {
    const parts = props.modelValue.toString()?.split(' ');
    const code = parts[0];
    console.log('code: ' + code);
    const filtered = countryData.filter((c) => c.dial_code === code);
    if (filtered.length > 0) {
        preselectedCountry = filtered[0];
        preselectedCountryIndex = countryData.findIndex((c) => c.dial_code === code);
        parts.shift();
    }
}
const country = ref<Country>(preselectedCountry);
const selectedIndex = ref<number>(preselectedCountryIndex);
const component = ref<any | null>(null);

const phoneNumber = computed(() => {
    console.log('[PhoneFieldInput] Model value:', props.modelValue);
    let modelValue = props.modelValue?.toString();
    if (modelValue.startsWith('00')) {
        modelValue = modelValue.replace('00', '+');
    }
    if (!modelValue.startsWith('+')) {
        return modelValue;
    }

    const countryCode = modelValue.split(' ')[0];
    const withoutCountryCode = modelValue.replace(countryCode, '').trim();

    if (countryData.filter((c: Country) => c.dial_code == countryCode.trim()).length <= 0) {
        return withoutCountryCode;
    }
    if (!country.value) {
        return withoutCountryCode;
    }

    const masked = applyMask(withoutCountryCode).replace(country.value.dial_code, '').trim();
    console.log('[PhoneFieldInput] Masked computed value:', masked);
    return masked;
});

function updatePhoneNumber(newValue: string) {
    emit('update:modelValue', applyMask(newValue));
}

function applyMask(unmaskedPhoneNumberWithoutCountryCode: string) {
    const filteredMasks = phoneMasks
        .filter((p: PhoneMask) => p.code.startsWith(country.value.dial_code))
        .sort((a, b) => {
            if (a.code.length > b.code.length) {
                return 1;
            }
            if (a.code.length < b.code.length) {
                return -1;
            }
            return 0;
        });

    const defaultMask = filteredMasks.length > 0 ? filteredMasks[0].code : null;
    if (!defaultMask) {
        return unmaskedPhoneNumberWithoutCountryCode;
    }
    const mask = defaultMask;
    // const ordered = filteredMasks.filter(
    //     (p: PhoneMask) => p.code.length >= unmaskedPhoneNumberWithoutCountryCode.length,
    // );
    // console.log('Ordered', ordered);
    // const mask = ordered.shift()?.code || defaultMask;
    console.log('mask', mask);

    let i = 0;
    const val = unmaskedPhoneNumberWithoutCountryCode.replace(/\D/g, '');
    let masked = mask.replace(/(?!\+)./g, (a) => {
        if (/\d/.test(a) || a == ' ') {
            return a;
        }
        if (i < val.length) {
            return val.charAt(i++);
        }
        return '';
    });
    if (i < val.length) {
        masked += val.substring(i, val.length);
    }
    console.log('masked', masked);
    return masked;
}

function setCountry(c: Country) {
    country.value = c;
    emit('countrySelected', c);
    component.value?.querySelector('#' + props.id).focus();
}

function setSelectedCountry() {
    if (selectedIndex.value > -1 && selectedIndex.value < countries.value.length) {
        setCountry(countries.value[selectedIndex.value]);
    }
}

function decreaseIndex() {
    if (selectedIndex.value > -1) {
        selectedIndex.value = selectedIndex.value - 1;
    }
}

function increaseIndex() {
    if (selectedIndex.value < countries.value.length) {
        selectedIndex.value = selectedIndex.value + 1;
    }
}

function filterCountries(e: KeyboardEvent | any) {
    const search = e.target?.value;
    const isNext = e.key === 'ArrowDown';
    const isPrevious = e.key === 'ArrowUp';
    const isNavigationEvent = isNext || isPrevious || e.key === 'Enter';

    // reset list
    countries.value = mostUsedCountries.concat(countryData);
    if (!search && !isNavigationEvent) {
        selectedIndex.value = -1;
        return;
    }

    if (search) {
        countries.value = countryData;
    }

    // filter accordingly
    countries.value = countries.value.filter(
        (c) =>
            c.code.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            c.dial_code.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );
    if (e.key === 'Enter') {
        setSelectedCountry();
        return;
    }
    if (!isNavigationEvent && (selectedIndex.value === -1 || selectedIndex.value > countries.value.length)) {
        selectedIndex.value = 0;
    }
    const list = document.querySelector('[data-countries]');
    if (!list) {
        return;
    }
    const selected = list.querySelector('li.selected');
    if (!selected) {
        return;
    }

    let index = Array.prototype.indexOf.call(selected?.parentNode?.children, selected);
    if (isNext) {
        index += 1;
    } else if (isPrevious) {
        index -= 1;
    }

    const item = selected?.parentNode?.children.item(index);
    if (!item) {
        return;
    }

    // console.log(`window: ${list.scrollTop} to ${list.scrollTop + list.offsetHeight} and item position is ${item.offsetTop} to ${item.offsetTop + item.offsetHeight} (scroll: ${item.offsetTop - list.offsetHeight})for item ${currentIndex}: ${item.innerText}`);

    if (item.offsetTop + item.offsetHeight >= list.scrollTop + list.offsetHeight) {
        list.scrollTo({ top: item.offsetTop - list.offsetHeight + item.offsetHeight });
    }
    if (item.offsetTop <= list.scrollTop) {
        list.scrollTo({ top: item.offsetTop - list.offsetTop });
    }
}

function focusCountrySearch() {
    document.getElementById('country-search')?.focus();
}
</script>

<template>
    <div ref="component" class="flex flex-col">
        <label class="w-full text-left label-text" for="phone">
            {{ label || $t('Phone') }}
        </label>
        <div ref="input" class="w-full flex flex-row">
            <div class="dropdown dropdown-top dropdown-start">
                <div
                    class="btn rounded-none rounded-tl rounded-bl"
                    role="button"
                    tabindex="0"
                    @click="focusCountrySearch"
                >
                    {{ country?.dial_code }}
                </div>
                <div class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-96" tabindex="0">
                    <div class="flex flex-col max-h-80">
                        <ul class="overflow-y-scroll" data-countries>
                            <li
                                v-for="(c, index) in countries"
                                :key="index"
                                class="w-full"
                                :class="{ selected: index == selectedIndex }"
                                @click="setCountry(c)"
                            >
                                <div class="flex flex-row justify-between">
                                    <span>{{ c.flag }}&nbsp;{{ c.dial_code }}</span>
                                    <span class="text-right">{{ c.name }}</span>
                                </div>
                            </li>
                        </ul>
                        <div class="mt-2 mb-2">
                            <input
                                id="country-search"
                                class="input input-sm w-full"
                                placeholder="Type here"
                                type="text"
                                @keyup="filterCountries"
                                @keyup.up.prevent="decreaseIndex()"
                                @keyup.down.prevent="increaseIndex()"
                                @keyup.enter="setSelectedCountry()"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <BaseInput
                :id="id"
                type="tel"
                class="rounded-none rounded-br rounded-tr"
                :model-value="phoneNumber"
                v-bind="$attrs"
                @update:model-value="(v) => updatePhoneNumber(v)"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.selected {
    @apply bg-primary-content border border-primary rounded;
}
</style>
